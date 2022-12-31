<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221231132046 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE contact_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE disruption_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE media_object_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE typology_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, name VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE contact (id INT NOT NULL, company_id INT NOT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, zip_code VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_4C62E638979B1AD6 ON contact (company_id)');
        $this->addSql('CREATE TABLE disruption (id INT NOT NULL, author_id INT NOT NULL, transport_type VARCHAR(255) NOT NULL, content TEXT NOT NULL, lat DOUBLE PRECISION NOT NULL, long DOUBLE PRECISION NOT NULL, priority VARCHAR(255) NOT NULL, created_at VARCHAR(255) NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DB672C1CF675F31B ON disruption (author_id)');
        $this->addSql('COMMENT ON COLUMN disruption.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE media_object (id INT NOT NULL, file_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE typology (id INT NOT NULL, file_id INT NOT NULL, label VARCHAR(255) NOT NULL, color VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1596C8F893CB796C ON typology (file_id)');
        $this->addSql('CREATE TABLE typology_typology (typology_source INT NOT NULL, typology_target INT NOT NULL, PRIMARY KEY(typology_source, typology_target))');
        $this->addSql('CREATE INDEX IDX_603860B63512058A ON typology_typology (typology_source)');
        $this->addSql('CREATE INDEX IDX_603860B62CF75505 ON typology_typology (typology_target)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, phone VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE contact ADD CONSTRAINT FK_4C62E638979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE disruption ADD CONSTRAINT FK_DB672C1CF675F31B FOREIGN KEY (author_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology ADD CONSTRAINT FK_1596C8F893CB796C FOREIGN KEY (file_id) REFERENCES media_object (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_typology ADD CONSTRAINT FK_603860B63512058A FOREIGN KEY (typology_source) REFERENCES typology (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE typology_typology ADD CONSTRAINT FK_603860B62CF75505 FOREIGN KEY (typology_target) REFERENCES typology (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE contact_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE disruption_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE media_object_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE typology_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE contact DROP CONSTRAINT FK_4C62E638979B1AD6');
        $this->addSql('ALTER TABLE disruption DROP CONSTRAINT FK_DB672C1CF675F31B');
        $this->addSql('ALTER TABLE typology DROP CONSTRAINT FK_1596C8F893CB796C');
        $this->addSql('ALTER TABLE typology_typology DROP CONSTRAINT FK_603860B63512058A');
        $this->addSql('ALTER TABLE typology_typology DROP CONSTRAINT FK_603860B62CF75505');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE contact');
        $this->addSql('DROP TABLE disruption');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE typology');
        $this->addSql('DROP TABLE typology_typology');
        $this->addSql('DROP TABLE "user"');
    }
}
