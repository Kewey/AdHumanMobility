<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221219234810 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE disruption_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE typology_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE disruption (id INT NOT NULL, author_id INT NOT NULL, transport_type VARCHAR(255) NOT NULL, content TEXT NOT NULL, lat DOUBLE PRECISION NOT NULL, long DOUBLE PRECISION NOT NULL, priority VARCHAR(255) NOT NULL, created_at VARCHAR(255) NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DB672C1CF675F31B ON disruption (author_id)');
        $this->addSql('COMMENT ON COLUMN disruption.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE typology (id INT NOT NULL, label VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CF675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE disruption_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE typology_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CF675F31B');
        $this->addSql('DROP TABLE disruption');
        $this->addSql('DROP TABLE typology');
        $this->addSql('DROP TABLE "user"');
    }
}
