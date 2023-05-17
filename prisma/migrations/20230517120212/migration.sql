-- CreateTable
CREATE TABLE "Expenditure" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "expenditureCategoryId" INTEGER NOT NULL,

    CONSTRAINT "Expenditure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenditureCategory" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "ExpenditureCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenditure" ADD CONSTRAINT "Expenditure_expenditureCategoryId_fkey" FOREIGN KEY ("expenditureCategoryId") REFERENCES "ExpenditureCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
