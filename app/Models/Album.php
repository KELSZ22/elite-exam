<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Album extends Model
{
    /** @use HasFactory<\Database\Factories\AlbumFactory> */
     use HasFactory, SoftDeletes;

    protected $fillable = [
        'artist_id',
        'image',
        'year',
        'name',
        'sales',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return Storage::disk('public')->url($this->image);
        }
        return null;
    }

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
