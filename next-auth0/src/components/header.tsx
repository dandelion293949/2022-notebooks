import { Alignment, Button, ButtonGroup, Classes, Navbar, Intent } from "@blueprintjs/core";
import { useRouter } from "next/router";
import React from "react";

export const Header: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Navbar className={Classes.DARK}>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Next Auth0</Navbar.Heading>
          <Navbar.Divider />
          <ButtonGroup className="flex space-x-2">
            <Button
              className={Classes.BUTTON}
              intent={Intent.PRIMARY}
              icon="home"
              text="Home"
              onClick={() => router.push("/")}
            />
            <Button
              className={Classes.BUTTON}
              intent={Intent.PRIMARY}
              icon="document"
              text="Document"
              onClick={() => router.push("/document")}
            />
          </ButtonGroup>
        </Navbar.Group>
      </Navbar>
    </>
  );
};
