<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ActivityResource extends JsonResource
{


    public function toArray($request)
    {

        $data = [
            'id' => $this->id,
            'log_name' => $this->log_name,
            'user_name' => $this->name,
            'organization' => $this->organization,
            'user_mobile' => $this->mobile,
            'type' => $this->description,
            'event' => $this->event,
            'model_id' => $this->subject_id,
            'model' => class_basename($this->subject_type), // Extract only the class name
            'user_id' => $this->causer_id,
            'batch_uuid' => $this->batch_uuid,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        if ($this->properties && isset($this->properties['old'])) {
            $data['properties']['old'] = $this->properties['old'];
        }

        if ($this->properties && isset($this->properties['attributes'])) {
            $data['properties']['attributes'] = $this->properties['attributes'];
        }
        return $data;
    }
}
