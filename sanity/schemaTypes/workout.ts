import {defineType, defineField} from 'sanity'

type WorkoutSet = {
  reps?: number
  weight?: number
  weightUnit?: string
}

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'Clerk user ID of the person who performed this workout',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'exercises',
      title: 'Exercises',
      type: 'array',
      of: [
        defineField({
          name: 'exerciseEntry',
          title: 'Exercise Entry',
          type: 'object',
          fields: [
            defineField({
              name: 'exercise',
              title: 'Exercise',
              type: 'reference',
              to: [{type: 'exercise'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'sets',
              title: 'Sets',
              type: 'array',
              of: [
                defineField({
                  name: 'set',
                  title: 'Set',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'reps',
                      title: 'Reps',
                      type: 'number',
                      validation: (Rule) => Rule.min(1),
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                      description: 'Amount lifted (if applicable)',
                    }),
                    defineField({
                      name: 'weightUnit',
                      title: 'Weight Unit',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Kilograms', value: 'kg'},
                          {title: 'Pounds', value: 'lbs'},
                        ],
                        layout: 'radio',
                      },
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'exercise.name',
              sets: 'sets',
            },
            prepare({title, sets}) {
              const setCount = sets ? sets.length : 0
              const setDetails = sets
                ?.map(
                  (s: WorkoutSet, i: number) =>
                    `Set ${i + 1}: ${s.reps || '-'} reps ${
                      s.weight ? `@ ${s.weight}${s.weightUnit || ''}` : ''
                    }`,
                )
                .join(' | ')

              return {
                title: title || 'Unnamed exercise',
                subtitle: setCount ? `${setCount} set(s) • ${setDetails}` : 'No sets added',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      userId: 'userId',
      date: 'date',
      exercises: 'exercises',
    },
    prepare(selection) {
      const {userId, date, exercises} = selection
      const exerciseCount = exercises ? exercises.length : 0

      return {
        title: `Workout by ${userId}`,
        subtitle: `${exerciseCount} exercise(s) • ${
          date ? new Date(date).toLocaleDateString() : ''
        }`,
      }
    },
  },
})
