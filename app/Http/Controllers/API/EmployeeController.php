<?php

namespace App\Http\Controllers\API;

use App\Employee;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $employees = Employee::all();
        return response()->json([
            'employees' => $employees
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $employeeData = request(['person', 'address', 'posta']);

        Employee::create($employeeData)->save();
        return response()->json([
            'success' => trans('employee.employeeAdded')
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function show(Employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Employee $employee)
    {
        return response()->json([
            'employee' => $employee
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Employee $employee)
    {
        $employeeData = request(['id', 'person', 'address', 'posta']);
        $employee->update($employeeData);

        return response()->json([
            'success' => trans('employee.employeeUpdated'),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Employee  $employee
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json([
            'success' => trans('employee.employeeRemoved'),
        ], 200);
    }
}
