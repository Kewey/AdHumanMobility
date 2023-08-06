<?php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

final class UserProcessor implements ProcessorInterface
{
    private Mailer $mailer;

    public function __construct(private ProcessorInterface $persistProcessor, private ProcessorInterface $removeProcessor, MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }

        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        $this->sendWelcomeEmail($data);
        return $result;
    }

    private function sendWelcomeEmail(User $user)
    {
        $email = (new Email())
            ->from('hello@example.com')
            ->to($user->getEmail())
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

        return $this->mailer->send($email);
    }
}
