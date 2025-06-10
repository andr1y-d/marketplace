<?php

namespace App\Composers;

use Illuminate\View\View;

class TestComposer
{
    public function compose(View $view): void
    {
        $view->with('count', 100);
    }
}
