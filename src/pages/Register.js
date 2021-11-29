import React from 'react';
import axios from 'commons/axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

//react hook , functional component

export default function Register(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  // email regex
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const onSubmit = async data => {
    try {
      const { nickname, email, password } = data;
      const res = await axios.post('/auth/register', { nickname, email, password });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      const user = global.auth.getUser(jwToken);
      toast.success('Hello, ' + user.nickname + '! Enjoy your shopping at Boots online store!');
      props.history.push('/');
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };


  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && 'is-danger'}`}
              type="text"
              name="nickname"
              {...register("nickname", {
                required: 'Nickname is required'
              })}
            />
            {errors.nickname &&
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            }
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              //  notify empty
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              name="email"
              {...register("email", {
                required: 'Email is required',
                pattern: {
                  value: re,
                  message: 'Invalid Email'
                }
              })}
            />
            {errors.email &&
              <p className="helper has-text-danger">
                {errors.email.message}
              </p>
            }
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input className={`input ${errors.password && 'is-danger'}`}
              type="password"
              name="password"
              {...register("password", {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password no less than 6 digits'
                }
              })}
            />
            {errors.password &&
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            }
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}