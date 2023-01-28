import dayjs from "dayjs"
import { FastifyInstance, FastifyRequest } from "fastify"
import { string, z } from 'zod'
import { prisma } from "./prisma"

export async function appRoutes(app: FastifyInstance) {
  app.post('/user', async (request) => {
    const createUserBody = z.object({
      uid: string(),
      displayName: z.string(),
      email: z.string(),
      photoURL: z.string()
    })

    const { uid, displayName, email, photoURL } = createUserBody.parse(request.body)
  
    const user = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
        }
      }
    })

    if(user) {
      throw new Error("User already exists")
    }

    await prisma.users.create({
      data: {
        uid,
        displayName,
        email,
        photoURL,
        created_at: dayjs().startOf('day').toDate(),
        updated_at: dayjs().startOf('day').toDate(),
      }
    })
  })

  app.post('/habits', async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      user_email: string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      )
    })


    const { title, weekDays, user_email } = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()

    await prisma.habit.create({
      data: {
        title,
        user_email,
        created_at: today,
        weekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay,
            }
          })
        }
      }
    })
  })

  app.get('/day/:email', async (request) => {
    const { email } = request.params as any
    
    const getDayParams = z.object({
      date: z.coerce.date()
    })
    
    const { date } = getDayParams.parse(request.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        user_email: {
          equals: email,
          mode: 'insensitive'
        },
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []

    return {
      possibleHabits,
      completedHabits
    }
  })

  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid(),
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      }
    })

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        }
      }
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        }
      })
    }
  })

  app.get('/summary/:email', async (request) => {
    const { email } = request.params as any
    
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date, 
        (
          SELECT
            count(*) :: float
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,

        (
          SELECT 
            count(*) :: float
          FROM habits_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE 
            HWD.week_day = extract(dow from to_timestamp(date_part('epoch', D.date)::bigint))
            AND H.created_at <= D.date
            AND H.user_email = ${email}
        ) as amount
      FROM days D
      `

    return summary
  })
}
