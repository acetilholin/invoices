<?php


namespace App\helpers;

use App\User;

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
}
