<?php

namespace App\DataFixtures;

use App\Factory\UserFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        UserFactory::createOne([
            'email' => 'test@adhm.local',
            'password' => 'test',
            'roles' => ['ROLE_ADMIN']
        ]);
        UserFactory::new()->createMany(10);
    }
}
