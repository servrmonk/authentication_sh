import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const history = useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSAdz79HZaDlV3ROmXP6OdJFdscaXCuaM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token, //stored in our context
          password: enteredNewPassword,
          returnSecureToken: false
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then((res) => {
      console.log("res", res);

      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
