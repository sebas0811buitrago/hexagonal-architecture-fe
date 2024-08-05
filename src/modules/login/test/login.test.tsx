import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { faker } from "@faker-js/faker";
import Login from "@login/components/login";

describe("login", () => {
  test("should redirect the user when logging is succesful", async () => {
    const onSuccesfulLoggin = vi.fn();
    const login = vi.fn();

    const fakeUserName = faker.internet.userName();
    const fakeUserPassword = faker.internet.password();

    render(<Login onSuccesfulLoggin={onSuccesfulLoggin} login={login} />);

    const username = screen.getByRole("textbox", { name: /user name/i });
    const password = screen.getByRole("textbox", { name: /password/i });
    const loginButton = screen.getByRole("button", { name: /^login$/i });

    await userEvent.type(username, fakeUserName);
    await userEvent.type(password, fakeUserPassword);
    await userEvent.click(loginButton);

    expect(onSuccesfulLoggin).toHaveBeenCalledOnce();
    expect(login).toHaveBeenNthCalledWith(1, {
      password: fakeUserPassword,
      username: fakeUserName,
    });
  });

  test("should show error messages if username and password are less than 3 characters", async () => {
    const onSuccesfulLoggin = vi.fn();
    const login = vi.fn();
    render(<Login onSuccesfulLoggin={onSuccesfulLoggin} login={login} />);

    const loginButton = screen.getByRole("button", { name: /^login$/i });

    await userEvent.click(loginButton);

    const inputsErrorMessages = screen.getAllByRole("alert");

    expect(onSuccesfulLoggin).not.toHaveBeenCalledOnce();
    expect(login).not.toHaveBeenCalledOnce();
    expect(inputsErrorMessages).toHaveLength(2);
  });
});
