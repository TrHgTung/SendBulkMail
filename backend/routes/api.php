<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Validation\ValidationException;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// authentication
Route::post('/register', [AuthController::class, 'Register']);
Route::post('/login', [AuthController::class, 'Login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Interact with Job Data
    Route::get('/mails', [MailController::class, 'GetMails']); // xem cac email da gui thanh cong
    Route::post('/send', [MailController::class, 'SendMail']); // gui email
    Route::get('/mail/{id}', [MailController::class, 'GetMail']); // xem thong tin cua 1 email by Id
    // User information
    Route::post('/logout', [AuthController::class, 'LogOut']);
    Route::get('/profile', [AuthController::class, 'Profile']);
});
