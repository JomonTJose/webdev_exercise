import { API_URL } from "../constants";
import { IUser, ISkill } from "../models/types";

export const fetchUsers = async (skills: string[]): Promise<IUser[] | any> => {
  try {
    const req_params = skills.length ? "?skill=" + skills.join("&skill=") : "";
    const response = await fetch(`${API_URL}users${req_params}`);
    const { users } = await response.json();
    return users;
  } catch (error) {
    return error;
  }
};

export const addUsersBulk = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      method: "POST",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteUsersBulk = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}users`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchSkills = async (): Promise<ISkill[] | any> => {
  try {
    const response = await fetch(`${API_URL}skills`);
    const { skills } = await response.json();
    return skills;
  } catch (error) {
    return error;
  }
};

export const addSkills = async (
  skills: string[],
  userId: number
): Promise<IUser[] | any> => {
  console.log(JSON.stringify({ skills }));
  try {
    const response = await fetch(`${API_URL}users/${userId}/skills`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skills }),
    });
    const { users } = await response.json();
    return users;
  } catch (error) {
    return error;
  }
};
