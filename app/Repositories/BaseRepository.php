<?php

namespace App\Repositories;

abstract class BaseRepository
{
    protected $query;
    public abstract function getById($id);
    public abstract function filter($condition);
    public abstract function create($data);
    public abstract function update($data);

}
