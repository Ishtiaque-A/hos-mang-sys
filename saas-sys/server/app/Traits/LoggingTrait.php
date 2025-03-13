<?php

namespace App\Traits;

use Illuminate\Support\Facades\Log;

trait LoggingTrait {
    public function log($type, $message, $data = null) {
        try {
            $logger_key = '';
//            $logger_key = app('permission')->permissions['logger_key'] ?? '';
            $log = 'key: '.$logger_key.' '.$message;
            if ($data) {
                $log = $log.' '.json_encode($data);
            }
            $type = strtoupper($type);
            $logger = Log::channel('daily');
            //            Log::channel('custom')->info($message);

            if ($type == 'INFO') {
                $logger->info($log);
            } elseif ($type == 'WARN') {
                $logger->warning($log);
            } elseif ($type == 'ERROR') {
                $logger->error($log);
            } elseif ($type == 'FATAL') {
                $logger->error($log);
            } else {
                $logger->debug($log);
            }
        } catch (\Exception $e) {
            Log::warning($e->getMessage().' : '.$message);
        }
    }
}
