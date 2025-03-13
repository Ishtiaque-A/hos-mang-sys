<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('settings')->insert([
            [
                'organization_id' => 1,
                'is_2fa' => 0,
                'is_api_key' => 0,
                'is_notification' => 0,
                'is_push_notification' => 0,
                'is_sms_notification' => 0,
                'is_email_notification' => 0,
                'is_sso' => 0,
                'is_direct_purchase' => 0,
                'contact_number' => '1234567890',
                'contact_mail' => 'example1@example.com',
                'currency' => 'BDT',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'organization_id' => 2,
                'is_2fa' => 1,
                'is_api_key' => 1,
                'is_notification' => 1,
                'is_push_notification' => 1,
                'is_sms_notification' => 1,
                'is_email_notification' => 1,
                'is_sso' => 1,
                'is_direct_purchase' => 1,
                'contact_number' => '9876543210',
                'contact_mail' => 'example2@example.com',
                'currency' => 'USD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'organization_id' => 3,
                'is_2fa' => 1,
                'is_api_key' => 0,
                'is_notification' => 1,
                'is_push_notification' => 1,
                'is_sms_notification' => 0,
                'is_email_notification' => 1,
                'is_sso' => 0,
                'is_direct_purchase' => 1,
                'contact_number' => '9876543210',
                'contact_mail' => 'example3@example.com',
                'currency' => 'EUR',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
