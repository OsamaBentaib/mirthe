import React, { useEffect } from "react";
import FolowCard from "../../widgets/FolowCard";
import { useLazyQuery } from "@apollo/client";
import { getNotifictionQuery } from "../../../store/constants/queries";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PROXY } from "../../../store/constants/urls";
import moment from "moment";
export default function NotificationContainer() {
  const [getNotifiction, { data: notiData, loading }] = useLazyQuery(
    getNotifictionQuery
  );
  useEffect(() => {
    getNotifiction({ variables: { start: 0, limit: 10 } });
  }, [getNotifiction]);
  console.log(notiData);
  return (
    <div className="row mt-4 mt-md-5">
      <div className="col-12 col-xl-8">
        <div className="card">
          <div className="card-header">
            <h3 className="card-header-title">Notifications</h3>
          </div>
          <div className="card-body">
            <div className="list-group list-group-flush list-group-activity my-n3">
              {loading && <LoadingSpinner />}
              {notiData &&
                notiData.getNotification.map((not, index) => (
                  <div key={index} className="list-group-item text-reset">
                    <div className="row">
                      <div className="col-auto">
                        <div className="avatar avatar-sm">
                          <img
                            src={
                              PROXY +
                              `avatar/${not.createdBy.profile.avatar.filename}`
                            }
                            alt="..."
                            className="avatar-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="col ml-n2">
                        <div className="small">
                          <strong>{not.createdBy.username}</strong>{" "}
                          {not.message}
                          {'" ' + not.content + ' "'}.
                        </div>
                        <small className="text-muted">
                          {moment(not.createdAt).fromNow()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-4">
        <FolowCard />
      </div>
    </div>
  );
}
