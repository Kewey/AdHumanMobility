<?php

namespace App\Entity;

use App\Repository\RefreshTokenRepository;
use Gesdinet\JWTRefreshTokenBundle\Entity\RefreshToken;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: "refresh_tokens")]
class JwtRefreshToken extends RefreshToken
{
}
