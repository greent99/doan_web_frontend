import React from 'react'
import './authentication.css'
import { useForm } from "react-hook-form";
import { axiosInstance } from '../../utils';

export default function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data)
        const res = await axiosInstance.post('/auth/register', data)
        console.log(res)
    }

    return (
        <div class='body'>
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-xl-9 mx-auto">
                        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                            <div class="card-img-left d-none d-md-flex">
                            </div>
                            <div class="card-body p-4 p-sm-5">
                                <h5 class="card-title text-center mb-5 fw-light fs-5">Register</h5>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div class="form-floating mb-3">
                                        <input {...register("username", { required: true })} class="form-control" id="floatingInputUsername" placeholder="myusername" />
                                        <label for="floatingInputUsername">Username</label>
                                        <div class='d-flex justify-content-start'>
                                            {errors.username && <span class='text-danger'>* This field is required</span>}
                                        </div>
                                    </div>
                                    
                                    <div class="form-floating mb-3">
                                        <input {...register("email", {required: true})} type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                                        <label for="floatingInputEmail">Email address</label>
                                        <div class='d-flex justify-content-start'>
                                            {errors.email && <span class='text-danger'>* This field is required</span>}
                                        </div>
                                    </div>
                                    

                                    <div class="form-floating mb-3">
                                        <input {...register("password")} type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingPassword">Password</label>
                                        <div class='d-flex justify-content-start'>
                                            {errors.password && <span class='text-danger'>* This field is required</span>}
                                        </div>
                                    </div>

                                    <div class="form-floating mb-3">
                                        <input {...register("rePassword")} type="password" class="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password" />
                                        <label for="floatingPasswordConfirm">Confirm Password</label>
                                    </div>

                                    <div class="d-grid mb-2">
                                        <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                                    </div>

                                    <a class="d-block text-center mt-2 small" href="/auth/login">Have an account? Sign In</a>
                                    
                                    <hr class="my-4" />

                                    {/* <div class="d-grid mb-2">
                                        <button class="btn btn-lg btn-google btn-login fw-bold text-uppercase" type="submit">
                                            <i class="fab fa-google me-2"></i> Sign up with Google
                                        </button>
                                    </div>

                                    <div class="d-grid">
                                        <button class="btn btn-lg btn-facebook btn-login fw-bold text-uppercase" type="submit">
                                            <i class="fab fa-facebook-f me-2"></i> Sign up with Facebook
                                        </button>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
