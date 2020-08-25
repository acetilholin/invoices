@extends('mail.master')
@section('content')
    <h3>Ponastavitev gesla</h3>
    Kopirajte žeton:
    <p style="padding-top: 1rem;">
        <b>{{ $token }}</b><br>
    </p>
    <br>
    <p>
        <i>Po 60 minutah bo žeton neveljaven!</i>
    </p>
@endsection
