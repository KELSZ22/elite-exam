<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Artist extends Model
{
    /** @use HasFactory<\Database\Factories\ArtistFactory> */
        use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
    ];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }
}
