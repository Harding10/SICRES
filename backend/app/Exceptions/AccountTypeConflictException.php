<?php
namespace App\Exceptions;

use Exception;
/*
 * Sa seule et unique mission est de définir une erreur claire
 *  et sur-mesure spécifiquement conçue pour les conflits de rôles
 */


class AccountTypeConflictException extends Exception
{
  public function __construct(string $message = "Ce compte a déjà un rôle attribué")
  {
      parent::__construct($message, 409);
  }
}
