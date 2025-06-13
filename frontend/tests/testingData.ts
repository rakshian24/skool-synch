import { faker } from "@faker-js/faker";

export const DEV_URL = "https://raksh-skool-synch.vercel.app/";
export const NEXT_STEP_BUTTON = "SubmitBtn";

export interface TestData {
  username: string;
  email: string;
  password: string;
  todoTitle: string;
}

export const generateTestData = () => {
  const username = faker.person.firstName();
  return {
    username,
    email: `${username
      .replace(/\s+/g, "")
      .substring(0, 3)
      .toLowerCase()}_testUser@g.com`,
    password: "Test-123",
    todoTitle: faker.hacker.phrase(),
  };
};
