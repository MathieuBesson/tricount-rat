
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    const value = Math.floor(Math.random() * (max - min) + min);

    return value;
}

function generateRandomDate(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
        throw new Error('La date de début doit être antérieure à la date de fin.');
    }

    const randomTimestamp = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const randomDate = new Date(randomTimestamp);

    return randomDate;
}

async function removeAllBddContent() {
    const tableNameListNoFilter = await prisma.$queryRawUnsafe('SELECT tablename FROM pg_tables WHERE schemaname=\'public\'') as [];

    const tableNameList = tableNameListNoFilter.map((tableData: { tablename: string }) => {
        if (tableData.tablename !== '_prisma_migrations') {
            return tableData.tablename;
        }
    }).filter((item) => item !== undefined);

    tableNameList.forEach(async tableName => {
        const sqlQuery = `DELETE FROM "public"."${tableName}";`
        console.log(sqlQuery)
        await prisma.$queryRawUnsafe(sqlQuery);
    })
}

async function resetIdOfAllTables() {

    const sequenceListNoFilter = await prisma.$queryRawUnsafe(`SELECT sequence_name
FROM information_schema.sequences
WHERE sequence_schema = 'public';`) as [];

    const sequenceNameList = sequenceListNoFilter.map((sequenceData: { sequence_name: string }) => {
        return sequenceData.sequence_name;
    })

    sequenceNameList.forEach(async sequenceName => {
        const sqlQuery = `ALTER SEQUENCE \"public\".\"${sequenceName}\" RESTART WITH 1;`
        console.log(sqlQuery)
        await prisma.$queryRawUnsafe(sqlQuery);
    })
}

async function main() {

    await removeAllBddContent();
    await resetIdOfAllTables();

    const userList = [
        {
            firstName: "Jamie",
            lastName: "Howard",
            email: "jamie@howard.fr"
        },
        {
            firstName: "Randall",
            lastName: "Rodriquez",
            email: "randall@rodriquez.fr"
        },
        {
            firstName: "Toni",
            lastName: "Matthews",
            email: "toni@matthews.fr"
        }
    ];

    const expenditureCategoryList = [
        { name: "Loisir" },
        { name: "Courses" },
        { name: "Travaux" },
        { name: "Soirées" },
    ];

    let expenditureList = [];
    for (let i = 0; i < 15; i++) {
        expenditureList.push({
            date: generateRandomDate("2023-01-01", "2023-12-31"),
            amount: randomNumber(3, 30),
            userId: randomNumber(1, userList.length),
            expenditureCategoryId: randomNumber(1, expenditureCategoryList.length),
        });
    }

    let userListFetched = [];
    for (const user of userList) {
        userListFetched.push(await prisma.user.create({ data: user }))
    }

    let expenditureCategoryListFetched = [];
    for (const expenditureCategory of expenditureCategoryList) {
        expenditureCategoryListFetched.push(await prisma.expenditureCategory.create({ data: expenditureCategory }))
    }


    let expenditureListFetched = [];
    for (const expenditure of expenditureList) {
        expenditureListFetched.push(await prisma.expenditure.create({ data: expenditure }))
    }

    console.log({
        userList: userListFetched,
        expenditureCategoryList: expenditureCategoryListFetched,
        expenditureList: expenditureListFetched,
    });
}

// Launch BDD seed
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // Close Prisma Client at the end
        await prisma.$disconnect();
    });