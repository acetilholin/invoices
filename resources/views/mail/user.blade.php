@extends('mail.master')
@section('content')
    <h3>Ustvarjen je nov uporabnik s podatki</h3>
    <p style="padding-top: 1rem;">
        Email: <b>{{ $email }}</b><br>
        Geslo: <b>{{ $password }}</b><br>
    </p>
    <p>
        Geslo si spremenite ob prvi prijavi!
    </p>
    <div class="text-center">
        <a href="#" class="custom-red">Prijava</a>
    </div>
@endsection
