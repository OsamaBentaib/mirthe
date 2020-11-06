import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { profileQuery } from "../../../store/constants/queries";
import { PROXY } from "../../../store/constants/urls";

export default function SettingsContainer() {
  const [loading, setLoading] = useState(false);
  const me = JSON.parse(localStorage.getItem("user"));
  console.log(me);
  const [variables, setVariables] = useState({
    phone: me ? me.profile.phone : "",
    lastName: me ? me.profile.lastName : "",
    firstName: me ? me.profile.firstName : "",
    location: me ? me.profile.location : "",
    birthday: me ? me.profile.birthday : "",
    avatar: null,
  });
  const [alert, setAlert] = useState(null);
  const [saveProfile] = useMutation(profileQuery, {
    onError: (err) => console.log(err),
    onCompleted: (data) => {
      setLoading(false);
      setAlert("Profile updated succesfully!");
    },
  });

  const onhandelChange = (e) => {
    setVariables({ ...variables, [e.target.name]: e.target.value });
  };
  /**
   * saving the new changes
   */
  const onhandelSave = (e) => {
    const {
      phone,
      lastName,
      firstName,
      location,
      birthday,
      avatar,
    } = variables;
    const f = {
      phone: phone,
      lastName: lastName,
      firstName: firstName,
      location: location,
      birthday: birthday,
      avatar: avatar,
    };
    console.log(f);
    setLoading(true);
    saveProfile({
      variables: f,
    });
  };
  /**
   * use ref for hidden input and added to the upload button
   */
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  /**
   * On select avatar event!
   */
  const onSelectEvent = (e) => {
    const image = e.target.files[0];
    Object.assign(image, {
      preview: URL.createObjectURL(image),
    });
    console.log(image);
    setVariables({ ...variables, avatar: image });
  };
  /**
   *
   * delete Accout and remove localeStorag return to login screen
   */
  const [deleteAccout] = useMutation(
    gql`
      mutation {
        deteteAccount
      }
    `,
    {
      onCompleted() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login/";
      },
    }
  );
  const onDeleteAccount = (e) => {
    deleteAccout();
  };
  const { phone, lastName, firstName, location, birthday, avatar } = variables;
  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-10 col-xl-8">
        <div className="header mt-md-5">
          <div className="header-body">
            <div className="row align-items-center">
              <div className="col">
                <h6 className="header-pretitle">Overview</h6>
                <h1 className="header-title">Account</h1>
              </div>
            </div>
            <div className="row align-items-center"></div>
          </div>
        </div>
        <div className="row justify-content-between align-items-center">
          <div className="col">
            <div className="row align-items-center">
              <div className="col-auto">
                <div className="avatar">
                  <img
                    className="avatar-img rounded-circle"
                    src={
                      avatar
                        ? avatar.preview
                        : PROXY + `avatar/${me.profile.avatar.filename}`
                    }
                    alt="..."
                  />
                </div>
              </div>
              <div className="col ml-n2">
                <h4 className="mb-1">Your avatar</h4>
                <small className="text-muted">
                  PNG or JPG no bigger than 1000px wide and tall.
                </small>
              </div>
            </div>
          </div>
          <div className="col-auto">
            <input
              type={"file"}
              onChange={onSelectEvent}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
            <button className="btn btn-sm btn-primary" onClick={handleClick}>
              Upload
            </button>
          </div>
        </div>
        <hr className="my-5" />
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => onhandelChange(e)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Last name</label>

              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => onhandelChange(e)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12">
            <div className="form-group">
              <label className="mb-1">Locations</label>
              <input
                type="text"
                name="location"
                value={location}
                onChange={(e) => onhandelChange(e)}
                className="form-control"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Phone</label>

              <input
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => onhandelChange(e)}
                className="form-control mb-3"
                placeholder="(___)___-____"
                data-mask="(000) 000-0000"
                autocomplete="off"
                maxlength="14"
              />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Birthday</label>
              <input
                type="text"
                name="birthday"
                value={birthday}
                onChange={(e) => onhandelChange(e)}
                className="form-control flatpickr-input"
              />
            </div>
          </div>
        </div>
        {alert && <div className="alert alert-success">{alert}</div>}
        <button
          disabled={loading}
          onClick={onhandelSave}
          className={`btn btn-primary ${loading && "disabled"}`}
        >
          {loading ? "Saving changes..." : "Save changes"}
        </button>
        <hr className="mt-4 mb-5" />

        <div className="row justify-content-between mb-5">
          <div className="col-12 col-md-6">
            <h4>Delete your account</h4>
          </div>
          <div className="col-auto">
            <button onClick={onDeleteAccount} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
