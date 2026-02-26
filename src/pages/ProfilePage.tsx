import React, {useEffect} from 'react';
import '../css/ProfilePage.css';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {logout} from "../functions/functions";
import {fetchProfile} from "../store/reducers/ActionCreators";
import {Button, message} from "antd";

const ProfilePage = () => {

  const dispatch = useAppDispatch()

  const profile = useAppSelector(state => state.authReducer)

  useEffect(() => {
    dispatch(fetchProfile())
  }, [])

  useEffect(() => {
    if (profile.error) {
      message.error(profile.error)
    }
  }, [profile.error])


  return <>
    {
      profile.isLoading ? 'Loading...'
        : <div className="hi">
          Привет
          {JSON.stringify(profile.profile, null, 2)}
          <Button onClick={logout}>logout</Button>
        </div>
    }

  </>
};

export default ProfilePage;
