import React from 'react'
import './authentication.css'

export default function index() {
    return (
        <div class='body'>
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 col-xl-9 mx-auto">
                        <div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
                            <div class="card-img-left d-none d-md-flex">
                            </div>
                            <div class="card-body p-4 p-sm-5">
                                <h5 class="card-title text-center mb-5 fw-light fs-5">Login</h5>
                                <form>
                                    <div class="form-floating mb-3">
                                        <input type="email" class="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                                        <label for="floatingInputEmail">Email</label>
                                    </div>

                                    <hr />

                                    <div class="form-floating mb-3">
                                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                                        <label for="floatingPassword">Password</label>
                                    </div>

                                    <div class="d-grid mb-2">
                                        <button class="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Login</button>
                                    </div>

                                    <a class="d-block text-center mt-2 small" href="/auth/login">Have an account? Sign In</a>

                                    <hr class="my-4" />

                                    <div class="d-grid mb-2">
                                        <button class="btn btn-lg btn-google btn-login fw-bold text-uppercase" type="submit">
                                            <i class="fab fa-google me-2"></i> Sign up with Google
                                        </button>
                                    </div>

                                    <div class="d-grid">
                                        <button class="btn btn-lg btn-facebook btn-login fw-bold text-uppercase" type="submit">
                                            <i class="fab fa-facebook-f me-2"></i> Sign up with Facebook
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
