-- CreateTable
CREATE TABLE "Form" (
    "formID" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("formID")
);

-- CreateTable
CREATE TABLE "Question" (
    "questionID" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "formID" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("questionID")
);

-- CreateTable
CREATE TABLE "Answer" (
    "answerID" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "responseID" INTEGER NOT NULL,
    "questionID" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("answerID")
);

-- CreateTable
CREATE TABLE "Response" (
    "responseID" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "metadata" TEXT NOT NULL,
    "formID" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("responseID")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_formID_fkey" FOREIGN KEY ("formID") REFERENCES "Form"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_responseID_fkey" FOREIGN KEY ("responseID") REFERENCES "Response"("responseID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("questionID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formID_fkey" FOREIGN KEY ("formID") REFERENCES "Form"("formID") ON DELETE RESTRICT ON UPDATE CASCADE;
