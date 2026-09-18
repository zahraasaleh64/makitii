<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Resources\JobPostResource;
use App\Models\JobPost;
use Illuminate\Http\Request;

class JobPostController extends Controller
{
    public function index(Request $request)
    {
        $query = JobPost::active()
            ->whereHas('store', fn ($q) => $q->approved())
            ->with('store.category');

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $jobs = $query->orderByDesc('created_at')->paginate(12)->withQueryString();

        return JobPostResource::collection($jobs);
    }

    public function show(int $id)
    {
        $job = JobPost::active()
            ->whereHas('store', fn ($q) => $q->approved())
            ->with('store.category')
            ->findOrFail($id);

        return new JobPostResource($job);
    }
}
