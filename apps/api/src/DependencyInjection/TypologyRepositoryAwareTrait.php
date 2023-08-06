<?php

namespace App\DependencyInjection;

use App\Repository\TypologyRepository;
use Psr\Container\ContainerInterface;
use Symfony\Contracts\Service\Attribute\SubscribedService;

/**
 * @property ContainerInterface $container
 */
trait TypologyRepositoryAwareTrait
{
    #[SubscribedService]
    protected function getTypologyRepositoryService(): TypologyRepository
    {
        return $this->container->get(self::class . '::' . __FUNCTION__);
    }
}
