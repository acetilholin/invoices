<?php

namespace App\helpers;


class MsgFormatterHelper
{
    public function formatt($erorrs)
    {
        $data = [];
        for ($i = 0; $i < sizeof($erorrs); $i++) {
            if ($i + 1 < sizeof($erorrs)) {
                array_push($data, $erorrs[$i].", ");
            } else {
                array_push($data, $erorrs[$i].".");
            }
        }
        return $data;
    }
}
