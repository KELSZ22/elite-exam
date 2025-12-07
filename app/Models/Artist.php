<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Artist extends Model
{
    /** @use HasFactory<\Database\Factories\ArtistFactory> */
        use HasFactory, SoftDeletes;

    protected $fillable = [
        'image',
        'code',
        'name',
    ];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        if ($this->image) {
            return Storage::disk('public')->url($this->image);
        }
        return null;
    }

    public function albums()
    {
        return $this->hasMany(Album::class);
    }
}
