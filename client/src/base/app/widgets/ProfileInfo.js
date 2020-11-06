import React, { Component } from "react";
import moment from "moment";
export class ProfileInfo extends Component {
  render() {
    const { profile } = this.props;
    if (profile) {
      return (
        <div className="card">
          <div className="card-body">
            <div className="list-group list-group-flush my-n3">
              {profile.profile.birthday && profile.profile.birthday !== "" && (
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Birthday</h5>
                    </div>
                    <div className="col-auto">
                      <time className="small text-muted" dateTime="1988-10-24">
                        {profile.profile.birthday}
                      </time>
                    </div>
                  </div>
                </div>
              )}
              {profile.createdAt && profile.createdAt !== "" && (
                <div className="list-group-item">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="mb-0">Joined</h5>
                    </div>
                    <div className="col-auto">
                      <time
                        className="small text-muted"
                        dateTime={profile.createdAt}
                      >
                        {moment(profile.createdAt).fromNow()}
                      </time>
                    </div>
                  </div>
                </div>
              )}
              <div className="list-group-item">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="mb-0">Location</h5>
                  </div>
                  <div className="col-auto">
                    <small className="text-muted">
                      {profile.profile.location}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return <div></div>;
  }
}

export default ProfileInfo;
