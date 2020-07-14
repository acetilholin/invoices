<?php


namespace App\helpers;

use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class UserHelper
{
    public function editSingleAttr($request)
    {
        $id = $request->id;
        $attr = $request->attr;

        if ($attr === 'enabled') {
            $data = $request->data == 'true' ? 1 : 0;
        } else {
            if ($request->data == 'admin') {
                $data = 'user';
            } else {
                $data = 'admin';
            }
        }

        User::where('id', $id)
            ->update([$attr => $data]);
    }

    public function lastSeen($user)
    {
        $id = $user->id;
        User::where('id', $id)
            ->update(['last_seen' => date("Y-m-d H:i")]);
    }

    public function checkPassword($id, $password)
    {
        $user = User::where('id', $id)->first();
        return Hash::check($password, $user->password);
    }

    public function updatePassword($id, $password)
    {
        $password = Hash::make($password);
        User::where('id', $id)
            ->update(['password' => $password]);
    }

    public function checkPermissions($operation, $user)
    {
        $uid = session()->get('uid');
        $currentUser = User::find($uid);

        if ($user->email == env('ADMIN')) return trans('user.cannotChangeAdmin');
        else if($currentUser->role === 'user') return trans('user.notEnoughRights');
        else if ($user->id === $uid && $operation == 'delete') return trans('user.preventAutoDelete');
        else return null;
    }

    public function updatePhoto($request)
    {
        if ($request->hasFile('file')) {
            $id = $request->id;
            $file = $request->file('file');
            $name = $file->getClientOriginalName();
            $file->move('pictures/', $name);
        }

        User::where('id', $id)
            ->update(['picture' => $name]);

        return User::find($id);
    }
}
