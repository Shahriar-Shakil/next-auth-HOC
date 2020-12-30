import React from "react";
import { withUser } from "../hocs/withUser";

function User() {
  return (
    <div>
      This is user Page
      <div>Need Authentication to view this Page</div>
    </div>
  );
}
export default withUser(User);
