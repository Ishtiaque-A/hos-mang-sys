<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Organization;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\Auth;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {

            $auth = Auth::user();
            $page = $request->query('page') ?? 1;
            $rowsPerPage = $request->query('rowsPerPage') ?? 5;
            if ($auth["organization_id"] != null) {
                $branches = Branch::with('organization')
                    ->orderBy('created_at', 'desc')
                    ->filterByOrganization($auth["organization_id"])
                    ->paginate($rowsPerPage, ['*'], 'page', $page);
                return response()->json([
                    'data' => $branches,
                    'code' => 200,
                    'auth' => $auth
                ], 200);
            } else {
                $organizationId = $request->query('organization_id');
                $branches = Branch::with('organization')
                    ->orderBy('created_at', 'desc')
                    ->filterByOrganization($organizationId)
                    ->paginate($rowsPerPage, ['*'], 'page', $page);
                return response()->json([
                    'data' => $branches,
                    'code' => 200,
                ], 200);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function findBranchByOrganizationIdForServiceProvider()
    {
        try {
            $auth = Auth::user();
            if (!$auth['user_type'] == 3) {
                return response()->json([
                    'message' => 'You are not authorized to access this resource'
                ], 401);
            }
            $branches = Branch::where('organization_id', $auth["organization_id"])->where('status', 1)->select('id', 'name', 'organization_name', 'contact_person_name', 'organization_id',)->get();
            if (!$branches) {
                return response()->json([
                    'message' => 'Branch not found'
                ], 404);
            }
            return response()->json([
                'data' => $branches,
                'code' => 200,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }


    public function findBrachByOrganization($id)
    {

        try {
            $auth = Auth::user();

            if ($auth["organization_id"] != null) {
                $branches = Branch::where('organization_id', $auth["organization_id"])->get();
            } else {
                $branches = Branch::where('organization_id', $id)->get();
            }
            return response()->json([
                'data' => $branches,
                'code' => 200
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    public function allOrganization()
    {
        try {
            $auth = Auth::user();

            if ($auth["organization_id"] != null) {
                $organizations = Organization::where('id', '!=', $auth["organization_id"])->get();
            } else {
                $organizations = Organization::all();
                return response()->json(
                    [
                        'data' => $organizations
                    ],
                    200
                );
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
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
    public function show_without_auth($id)
    {
        $branch = Branch::where('organization_id', $id)->get();
        if (!$branch) {
            return response()->json([
                'message' => 'Branch not found'
            ], 404);
        }
        return response()->json($branch);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'organization_id' => 'required',
            ]);
            $branch = Branch::create($request->all());
            return response()->json([
                'message' => 'Branch created successfully',
                'data' => $branch,
                'code' => 200
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $branch = Branch::find($id);
            if (!$branch) {
                return response()->json([
                    'message' => 'Branch not found'
                ], 404);
            }
            return response()->json($branch);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit(Branch $branch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $branch = Branch::find($id);
            if (!$branch) {
                return response()->json([
                    'message' => 'Branch not found'
                ], 404);
            }
            $branch->update($request->all());
            return response()->json([
                'message' => 'Branch updated successfully',
                'data' => $branch,
                'code' => 200
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
                'code' => 500
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Branch $branch)
    {
        //
    }
}
