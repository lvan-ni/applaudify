-- CreateTable
CREATE TABLE "applaud" (
    "applaudId" UUID NOT NULL,
    "receiverId" UUID NOT NULL,
    "senderId" UUID NOT NULL,
    "applaudContent" VARCHAR(255) NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "applaud_pkey" PRIMARY KEY ("applaudId")
);

-- CreateTable
CREATE TABLE "user" (
    "userId" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "avatarURL" VARCHAR(255),
    "company" VARCHAR(255),
    "jobTitle" VARCHAR(255),
    "bio" VARCHAR(1000),
    "experience" VARCHAR(1000),
    "skills" VARCHAR(1000),
    "created_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "applaud" ADD CONSTRAINT "fk4xryanjhxq89hiadx8yjd22f2" FOREIGN KEY ("receiverId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "applaud" ADD CONSTRAINT "fkidp0ie7d7g0unyckfwtbmcpb3" FOREIGN KEY ("senderId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;
