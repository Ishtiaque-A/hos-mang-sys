@extends('layouts.admin_layouts.admin_layout')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Dashboard</h1>
        </div><!-- /.col -->
        <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/admin/dashboard">Home</a></li>
              <li class="breadcrumb-item active">Settings</li>
          </ol>
      </div><!-- /.col -->
  </div><!-- /.row -->
</div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->
<!-- Main content -->
<section class="content">
  <div class="container-fluid">
    <div class="row">
      <!-- left column -->
      <div class="col-md-6">
        <!-- general form elements -->
        <div class="card card-primary">
          <div class="card-header">
            <h3 class="card-title">Update Password</h3>
        </div>
        <!-- /.card-header -->
        @if(Session::has('error_message'))
            <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
              {{Session::get('error_message')}}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        @endif
         @if(Session::has('success_message'))
            <div class="alert alert-success alert-dismissible fade show mt-2" role="alert">
              {{Session::get('success_message')}}
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        @endif
        <!-- form start -->
        <form role="form" action="/admin/admins_update_password" name="updatePasswordForm" id="updatePasswordForm" method="post">
            @csrf
        <div class="card-body">
            {{-- <div class="form-group">
                <label for="name">Name</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Enter Name" value="{{ $data->name }}">
            </div> --}}
            <div class="form-group">
                <label for="exampleInputEmail1">Admin Type</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Enter Name" readonly="" value="{{ $data->type }}">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Email</label>
                <input type="email" class="form-control" id="exampleInputPassword1" readonly="" value="{{ $data->email}}">
            </div>
            <div class="form-group">
                <label for="current_password">Current Password</label>
                <input type="password" class="form-control" name="current_password" id="current_password" placeholder="Current Password">
                <span id="chkcurrent_password"></span>
            </div>
            <div class="form-group">
                <label for="new_password">New Password</label>
                <input type="password" class="form-control" name="new_password" id="new_password" placeholder="New Password">
            </div>
            <div class="form-group">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="Confirm Password">
            </div>



        </div>
        <!-- /.card-body -->

        <div class="card-footer">
          <button type="submit" class="btn btn-primary">Submit</button>
      </div>
  </form>
</div>
<!-- /.card -->


</div>
<!--/.col (left) -->

</div>
<!-- /.row -->
</div><!-- /.container-fluid -->
</section>
<!-- /.content -->

</div>
<!-- /.content-wrapper -->

@endsection