<?php

namespace App\Http\Controllers\API;

use App\helpers\MsgFormatterHelper;
use App\helpers\UserHelper;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return UsersResource::collection(User::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $rules = array(
            'username' => 'required|unique:users|max:30',
            'email' => 'required|unique:users|email:rfc,dns'
        );

        $userData = request(['username', 'email']);
        $validator = Validator::make($userData, $rules, $this->messages());

        if ($validator->fails()) {
            $formatter = new MsgFormatterHelper();
            $messages = $formatter->formatt($validator->errors()->all());
            return response()->json(['error' => $messages], 401);
        } else {
            $notEncrypted = Str::random(20);
            $password = Hash::make($notEncrypted);

            $userData['password'] = $password;

            try {
                User::create($userData)->save();
                $users = $this->index();
                return response()->json([
                    'success' => trans('user.userCreated'),
                    'users' => $users
                ], 200);
            } catch (\Exception $e) {
                return response()->json(['error' => trans('user.cannotCreate')], 401);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        $id = $request->id;
        $user = User::find($id);

        if ($user->email == env('ADMIN')) {
            return response()->json(['error' => trans('user.cannotChangeAdmin')], 401);
        }

        $userHelper = new UserHelper();
        $userHelper->editSingleAttr($request);

        $users = $this->index();
        return response()->json([
            'success' => trans('user.userDetailChanged'),
            'users' => $users
        ], 200);
    }

    /**
     * Show the form for editing password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function newPassword(Request $request)
    {
        $id = $request->id;
        $oldPassword = $request->password_old;
        $password = $request->password;
        $password_confirmation = $request->password_new;

        $rules = array(
            'password' => 'required|min:5',
            'password_confirmation' => 'required|same:password'
        );

        $credentials = [
            'password' => $password,
            'password_confirmation' => $password_confirmation
        ];

        $validator = Validator::make($credentials, $rules, $this->messages());

        if ($validator->fails()) {
            $formatter = new MsgFormatterHelper();
            $messages = $formatter->formatt($validator->errors()->all());
            return response()->json(['error' => $messages], 401);
        }

        $userHelper = new UserHelper();
        if (!$userHelper->checkPassword($id, $oldPassword)) {
            return response()->json(['error' => trans('user.wrongOldPassword')], 401);
        } else {
            $userHelper->updatePassword($id, $password);
            $user = User::find($id);
            return response()->json([
                'success' => trans('user.passwordUpdated'),
                'user' => $user
            ], 200);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user)
    {
        $id = $user->id;
        if ($user->email == env('ADMIN')) {
            return response()->json(['error' => trans('user.cannotDeleteAdmin')], 401);
        }

        try {
            User::where('id', $id)->delete();
            $users = $this->index();
            return response()->json([
                'success' => trans('user.userDeleted'),
                'users' => $users
            ], 200);
        } catch (\Exception $exception) {
            return response()->json(['error' => trans('user.cannotDelete')], 401);
        }
    }

    protected function messages()
    {
        return [
            'email.required' => trans('loginRegister.emailRequired'),
            'email.unique' => trans('loginRegister.emailAlreadyInUse'),
            'email.email' => trans('loginRegister.emailFormat'),
            'username.required' => trans('loginRegister.usernameRequired'),
            'username.unique' => trans('loginRegister.usernameAlreadyInUse'),
            'username.max' => trans('loginRegister.usernameMax'),
            'password.required' => trans('loginRegister.passwordRequired'),
            'password.min' => trans('loginRegister.passwordTooShort'),
            'password_confirmation.same' => trans('loginRegister.passwordMissmatch'),
            'password_confirmation.required' => trans('loginRegister.passConfirmationRequired'),
        ];
    }
}
