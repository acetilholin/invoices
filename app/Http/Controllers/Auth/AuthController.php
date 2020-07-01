<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\helpers\MsgFormatterHelper;
use App\Mail\Token;
use App\helpers\TokenHelper;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'token', 'reset']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $rules = array('email' => 'required|email:rfc,dns', 'password' => 'required');
        $credentials = request(['email', 'password']);
        $validator = Validator::make($credentials, $rules, $this->messages());

        if ($validator->fails()) {
            $formatter = new MsgFormatterHelper();
            $messages = $formatter->formatt($validator->errors()->all());
            return response()->json(['error' => $messages], 401);
        }

        $user = User::where('email', $credentials['email'])->first();
        if (!$user) {
            return response()->json(['error' => trans('loginRegister.emailNotExists')], 401);
        } else {
            if ((boolean) $user->enabled === false) {
                return response()->json(['error' => trans('loginRegister.accountNotEnabled')], 401);
            }
        }

        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => trans('loginRegister.wrongCredentials')], 401);
        }

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Registers new user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $rules = array(
            'username' => 'required|unique:users|max:30',
            'email' => 'required|unique:users|email:rfc,dns',
            'password' => 'required|min:5',
            'password_confirmation' => 'required|same:password'
        );

        $credentials = request(['username', 'email', 'password', 'password_confirmation']);
        $validator = Validator::make($credentials, $rules, $this->messages());

        if ($validator->fails()) {
            $formatter = new MsgFormatterHelper();
            $messages = $formatter->formatt($validator->errors()->all());
            return response()->json(['error' => $messages], 401);
        }

        $credentials['password'] = Hash::make($credentials['password']);

        User::create($credentials);

        return response()->json(['success' => trans('loginRegister.userCreated')], 200);
    }

    /**
     * Sends reset password token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function token(Request $request)
    {
        $email = $request->email;
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json(['error' => trans('loginRegister.unexistingEmail')], 401);
        } else {
            $token = Str::random(20);
            $tokenHelper = new TokenHelper();
            $tokenHelper->InsertToken($email, $token);
            \Mail::to($email)->send(new Token($token));
            return response()->json(['success' => trans('loginRegister.emailSent')], 200);
        }
    }

    /**
     * Reset password
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $rules = array(
            'email' => 'required|exists:users|email:rfc,dns',
            'token' => 'required|max:20',
            'password' => 'required|min:5',
            'password_confirmation' => 'required|same:password'
        );
        $credentials = request(['email', 'token', 'password', 'password_confirmation']);
        $validator = Validator::make($credentials, $rules, $this->messages());

        if ($validator->fails()) {
            $formatter = new MsgFormatterHelper();
            $messages = $formatter->formatt($validator->errors()->all());
            return response()->json(['error' => $messages], 401);
        }

        $tokenHelper = new TokenHelper();
        $tokenStatus = $tokenHelper->checkToken($credentials['email'], $credentials['token']);

        if ($tokenStatus === 'expired') {
            return response()->json(['error' => trans('loginRegister.tokenExpired')], 401);
        } else {
            if ($tokenStatus !== 'ok') {
                return response()->json(['error' => trans('loginRegister.tokenMissmatch')], 401);
            } else {
                $tokenHelper->insertNewPassword($credentials['email'], $credentials['password']);
                return response()->json(['success' => trans('loginRegister.passwordChanged')], 200);
            }
        }
    }

    protected function messages()
    {
        return [
            'email.required' => trans('loginRegister.emailRequired'),
            'email.exists' => trans('loginRegister.unexistingEmail'),
            'email.unique' => trans('loginRegister.emailAlreadyInUse'),
            'email.email' => trans('loginRegister.emailFormat'),
            'username.required' => trans('loginRegister.usernameRequired'),
            'username.unique' => trans('loginRegister.usernameAlreadyInUse'),
            'username.max' => trans('loginRegister.usernameMax'),
            'password.required' => trans('loginRegister.passwordRequired'),
            'password.min' => trans('loginRegister.passwordTooShort'),
            'password_confirmation.same' => trans('loginRegister.passwordMissmatch'),
            'password_confirmation.required' => trans('loginRegister.passConfirmationRequired'),
            'token.required' => trans('loginRegister.tokenRequired'),
            'token.max' => trans('loginRegister.tokenMax')
        ];
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'email' => $user->email,
            'name' => $user->name
        ]);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string  $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
