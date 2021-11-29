import React from 'react';
import axios from 'commons/axios'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

// react hook functional componenet

export default function Login(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();

  // email regex
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const onSubmit = async data => {
    try {
      const { email, password } = data;
      const res = await axios.post('/auth/login', { email, password });
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      const user = global.auth.getUser(jwToken);
      toast.success('Hello, ' + user.nickname + '! Welcome back to Boots online shopping!');
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
          <label className="label">Email</label>
          <div className="control">
            <input
              //  notify empty
              className={`input ${errors.email && 'is-danger'}`}
              type="text"
              placeholder="Email"
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
              placeholder="Password"
              name="password"
              {...register("password", {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password no less than 6 digits' // JS only: <p>error message</p> TS only support string
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
          <button className="button is-fullwidth is-primary">Login</button>
        </div>
      </form>
    </div>
  )
}
