<?php

namespace Database\Seeders;

use App\Models\Album;
use App\Models\Artist;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class AlbumSalesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csvFile = base_path('Data Reference (ALBUM SALES).csv');
        
        if (!file_exists($csvFile)) {
            $this->command->error('CSV file not found: ' . $csvFile);
            return;
        }

        $handle = fopen($csvFile, 'r');
        
        // Skip header row
        fgetcsv($handle);
        
        $artistCache = [];
        $count = 0;

        while (($row = fgetcsv($handle)) !== false) {
            if (empty($row[0])) continue;

            $artistName = trim($row[0]);
            $albumName = trim($row[1]);
            $sales = (float) str_replace(',', '', $row[2]);
            $dateReleased = $this->parseDate($row[3]);
            
            // Get or create artist
            if (!isset($artistCache[$artistName])) {
                $artist = Artist::firstOrCreate(
                    ['name' => $artistName],
                    ['code' => $this->generateArtistCode($artistName)]
                );
                $artistCache[$artistName] = $artist->id;
            }

            // Create album
            Album::create([
                'artist_id' => $artistCache[$artistName],
                'name' => $albumName,
                'year' => $dateReleased->format('Y'),
                'sales' => $sales,
            ]);

            $count++;
        }

        fclose($handle);
        
        $this->command->info("Seeded {$count} albums from " . count($artistCache) . " artists.");
    }

    /**
     * Parse date from YYMMDD format
     */
    private function parseDate(string $dateString): \DateTime
    {
        $dateString = trim($dateString);
        
        // Format: YYMMDD (e.g., 220117 = 2022-01-17)
        $year = '20' . substr($dateString, 0, 2);
        $month = substr($dateString, 2, 2);
        $day = substr($dateString, 4, 2);
        
        return new \DateTime("{$year}-{$month}-{$day}");
    }

    /**
     * Generate a unique artist code
     */
    private function generateArtistCode(string $artistName): string
    {
        // Create code from first letters + random string
        $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z0-9]/', '', $artistName), 0, 3));
        $suffix = strtoupper(Str::random(4));
        
        return $prefix . '-' . $suffix;
    }
}

