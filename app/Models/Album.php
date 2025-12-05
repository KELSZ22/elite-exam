<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Album extends Model
{
    /** @use HasFactory<\Database\Factories\AlbumFactory> */
     use HasFactory, SoftDeletes;

    protected $fillable = [
        'artist_id',
        'year',
        'name',
        'sales',
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
