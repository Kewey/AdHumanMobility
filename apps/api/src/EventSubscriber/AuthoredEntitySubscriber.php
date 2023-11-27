<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\Disruption;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class AuthoredEntitySubscriber implements EventSubscriberInterface
{
    private Security $security;

    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ['setAuthor', EventPriorities::PRE_WRITE]];
    }

    public function setAuthor(ViewEvent $event)
    {
        $entity = $event->getControllerResult();

        if (!$entity instanceof Disruption) {
            return;
        }

        $method = $event->getRequest()->getMethod();

        if (!in_array($method, [Request::METHOD_POST, Request::METHOD_PUT])) {
            return;
        }

        $role = $this->security->getToken()->getRoleNames();

        if (!$role) {
            return;
        }


        if (Request::METHOD_POST === $method) {
            $entity->setAuthor($this->security->getUser());
        }
    }
}
