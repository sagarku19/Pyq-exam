import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import { Pool } from 'pg';

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) throw new Error('DIRECT_URL or DATABASE_URL must be set');
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seeder...');

  const dataPath = path.join(__dirname, '../seeds/exams.json');
  if (!fs.existsSync(dataPath)) {
    console.log('seeds/exams.json not found. Skipping taxonomy seed.');
    return;
  }

  const examsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

  for (const examData of examsData) {
    // 1. Upsert Exam
    const exam = await prisma.exam.upsert({
      where: { slug: examData.slug },
      update: {
        name: examData.name,
        description: examData.description,
      },
      create: {
        name: examData.name,
        slug: examData.slug,
        description: examData.description,
      },
    });

    console.log(`✅ Upserted Exam: ${exam.name}`);

    if (examData.subjects) {
      for (const subjectData of examData.subjects) {
        // 2. Upsert Subject
        const subject = await prisma.subject.upsert({
          where: {
            examId_slug: {
              examId: exam.id,
              slug: subjectData.slug,
            },
          },
          update: {
            name: subjectData.name,
          },
          create: {
            name: subjectData.name,
            slug: subjectData.slug,
            examId: exam.id,
          },
        });

        console.log(`  └─ Upserted Subject: ${subject.name}`);

        if (subjectData.chapters) {
          for (const chapterData of subjectData.chapters) {
            // 3. Upsert Chapter
            const chapter = await prisma.chapter.upsert({
              where: {
                subjectId_slug: {
                  subjectId: subject.id,
                  slug: chapterData.slug,
                },
              },
              update: {
                name: chapterData.name,
              },
              create: {
                name: chapterData.name,
                slug: chapterData.slug,
                subjectId: subject.id,
              },
            });

            if (chapterData.topics) {
              for (const topicName of chapterData.topics) {
                // 4. Upsert Topic
                const topicSlug = topicName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                await prisma.topic.upsert({
                  where: {
                    chapterId_slug: {
                      chapterId: chapter.id,
                      slug: topicSlug,
                    },
                  },
                  update: {
                    name: topicName,
                  },
                  create: {
                    name: topicName,
                    slug: topicSlug,
                    chapterId: chapter.id,
                  },
                });
              }
            }
          }
        }
      }
    }
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
