@extends('mail.master')
@section('content')
    <h3>Ponastavitev gesla</h3>
    Kopirajte žeton.
    <b>Po 60 minutah bo žeton neveljaven!</b>
    <p style="padding-top: 1rem;">
        <b>{{ $token }}</b><br>
    </p>
    <div class="text-center">
        <a href="#" class="custom-red">Vnesi žeton</a>
    </div>
@endsection
